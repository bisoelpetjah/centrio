package com.olb.centrio.activities

import android.content.Intent
import android.os.Bundle
import android.support.design.widget.FloatingActionButton
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.support.v7.widget.Toolbar
import com.olb.centrio.R
import com.olb.centrio.adapters.HomeAdapter
import com.olb.centrio.http.WebService
import com.olb.centrio.models.Transaction
import com.olb.centrio.models.User
import com.olb.centrio.utils.PreferencesHelper
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

/**
 * Created by irvan on 9/15/16.
 */
class MainActivity: AppCompatActivity() {

    private var toolbar: Toolbar? = null
    private var recyclerView: RecyclerView? = null
    private var buttonScan: FloatingActionButton? = null

    private val homeAdapter = HomeAdapter()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        toolbar = findViewById(R.id.toolbar) as Toolbar
        recyclerView = findViewById(R.id.recycler) as RecyclerView
        buttonScan = findViewById(R.id.buttonScan) as FloatingActionButton

        setSupportActionBar(toolbar)

        buttonScan?.setOnClickListener { startActivity(Intent(this, ScanActivity::class.java)) }

        recyclerView?.adapter = homeAdapter
        recyclerView?.layoutManager = LinearLayoutManager(this)

        performGetCurrentUser()
    }

    override fun onRestart() {
        super.onRestart()

        performGetCurrentUser()
    }

    private fun performGetCurrentUser() {
        WebService.services!!.getUser(PreferencesHelper.userId).enqueue(object : Callback<User> {
            override fun onResponse(call: Call<User>?, response: Response<User>?) {
                homeAdapter.user = response?.body()

                performGetTransactionHistory()
            }

            override fun onFailure(call: Call<User>?, t: Throwable?) {}
        })
    }

    private fun performGetTransactionHistory() {
        WebService.services!!.getTransactionHistory(PreferencesHelper.userId).enqueue(object : Callback<List<Transaction>> {
            override fun onResponse(call: Call<List<Transaction>>?, response: Response<List<Transaction>>?) {
                homeAdapter.transactionList.clear()
                homeAdapter.transactionList.addAll(response?.body() ?: arrayListOf())

                homeAdapter.notifyDataSetChanged()
            }

            override fun onFailure(call: Call<List<Transaction>>?, t: Throwable?) {}
        })
    }
}