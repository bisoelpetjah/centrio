package com.olb.centrio.http

import com.olb.centrio.models.Item
import com.olb.centrio.models.Transaction
import com.olb.centrio.models.User
import retrofit2.Call
import retrofit2.http.*

/**
 * Created by irvan on 9/30/16.
 */
interface Services {

    @GET("login")
    fun getAccessToken(): Call<Token>

    @GET("user/{id}")
    fun getUser(@Path("id") id: String?): Call<User>

    @GET("user/{id}/transaction")
    fun getTransactionHistory(@Path("id") id: String?): Call<List<Transaction>>

    @GET("item/{id}/get")
    fun getItem(@Path("id") id: String?): Call<Item>

    @FormUrlEncoded
    @POST("transaction/create")
    fun buyItem(@Field("customer") userId: String?, @Field("item") itemId: String?, @Field("amount") amount: Int): Call<Transaction>
}