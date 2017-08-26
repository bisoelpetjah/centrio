package com.olb.centrio.http.interceptors

import com.olb.centrio.http.WebService
import com.olb.centrio.utils.PreferencesHelper
import okhttp3.Interceptor
import okhttp3.Response

/**
 * Created by itock on 8/26/2017.
 */
class AuthInterceptor : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {
        val response = chain.proceed((chain.request()))

        if (response.code() == 401) {
            WebService.accessToken = null
            val token = WebService.services?.getAccessToken()!!.execute()

            PreferencesHelper.accessToken = token?.body()?.token
            WebService.accessToken = PreferencesHelper.accessToken

            if (token == null) return response

            val builder = chain.request().newBuilder()
                    .removeHeader("Access-Token")
                    .addHeader("Access-Token", WebService.accessToken)

            return chain.proceed(builder.build())
        }

        return response
    }
}