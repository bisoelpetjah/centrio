package com.olb.centrio.http.interceptors

import okhttp3.Interceptor
import okhttp3.Response

/**
 * Created by itock on 8/26/2017.
 */
class TokenInterceptor: Interceptor {

    private val APPLICATION_TOKEN = ""

    var accessToken: String? = null

    override fun intercept(chain: Interceptor.Chain): Response {
        val builder = chain.request().newBuilder()
                .addHeader("Access-Token", accessToken ?: APPLICATION_TOKEN)

        return chain.proceed(builder.build())
    }
}