package com.olb.centrio.utils

import java.text.NumberFormat
import java.util.*

/**
 * Created by irvan on 9/29/16.
 */
object PriceUtils {

    fun formatNumberToPrice(number: Double): String {
        val formatter = NumberFormat.getInstance(Locale("id"))
        formatter.minimumFractionDigits = 2
        formatter.maximumFractionDigits = 2
        return formatter.format(number)
    }

    fun formatNumberToRupiah(number: Double): String {
        return "Rp${formatNumberToPrice(number)}"
    }
}