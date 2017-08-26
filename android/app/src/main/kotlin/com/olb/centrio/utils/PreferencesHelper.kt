package com.olb.centrio.utils

import android.content.Context
import android.content.SharedPreferences
import android.preference.PreferenceManager

/**
 * Created by irvan on 9/30/16.
 */
object PreferencesHelper {

    private val PREF_USER_ID = "pref_user_id"
    private val PREF_ACCESS_TOKEN = "pref_access_token"

    private var preferences: SharedPreferences? = null

    var context: Context? = null
        set(value) {
            field = value
            preferences = PreferenceManager.getDefaultSharedPreferences(context)
        }

    var userId: String?
        get() = preferences?.getString(PREF_USER_ID, null)
        set(value) {
            if (value == null) {
                preferences?.edit()
                        ?.remove(PREF_USER_ID)
                        ?.apply()
            } else {
                preferences?.edit()
                        ?.putString(PREF_USER_ID, value)
                        ?.apply()
            }
        }

    var accessToken: String?
        get() = preferences?.getString(PREF_ACCESS_TOKEN, null)
        set(value) {
            if (value == null) {
                preferences?.edit()
                        ?.remove(PREF_ACCESS_TOKEN)
                        ?.apply()
            } else {
                preferences?.edit()
                        ?.putString(PREF_ACCESS_TOKEN, value)
                        ?.apply()
            }
        }
}