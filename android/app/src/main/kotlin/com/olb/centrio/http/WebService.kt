package com.olb.centrio.http

import com.google.gson.GsonBuilder
import com.olb.centrio.http.interceptors.AuthInterceptor
import com.olb.centrio.http.interceptors.TokenInterceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

/**
 * Created by irvan on 9/30/16.
 */
object WebService {

    private val BASE_URL = "http://182.16.165.102:1337/"
    private val DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss'Z'"

    private val tokenInterceptor = TokenInterceptor()

    var services: Services? = null
        private set

    var accessToken: String?
        get() = tokenInterceptor.accessToken
        set(value) {
            tokenInterceptor.accessToken = value
        }

    fun init() {
        val gson = GsonBuilder()
                .setDateFormat(DATE_FORMAT)
                .create()

        val converter = GsonConverterFactory.create(gson)

        val logger = HttpLoggingInterceptor()
        logger.level = HttpLoggingInterceptor.Level.BODY

        val httpClient = OkHttpClient.Builder()
                .addInterceptor(tokenInterceptor)
                .addInterceptor(AuthInterceptor())
                .addInterceptor(logger)
                .build()

        val retrofit = Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(converter)
                .client(httpClient)
                .build()

        services = retrofit.create(Services::class.java)
    }
}