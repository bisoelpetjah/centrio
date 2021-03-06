package com.olb.centrio.models

import com.google.gson.annotations.SerializedName

/**
 * Created by irvan on 9/30/16.
 */
class Item {

    @SerializedName("item_id")
    var id: String? = null

    var name: String? = null

    var image: String? = null

    var description: String? = null

    var price: Double = 0.0

    var stock: Int = 0

    var merchant: User? = null
}