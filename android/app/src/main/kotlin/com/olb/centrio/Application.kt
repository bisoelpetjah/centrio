package com.olb.centrio

import android.app.Application
import com.olb.centrio.http.WebService
import com.olb.centrio.utils.PreferencesHelper

/**
 * Created by irvan on 9/30/16.
 */
class Application: Application() {
    override fun onCreate() {
        super.onCreate()

        PreferencesHelper.context = this

        WebService.init()
    }
}