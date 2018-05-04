# The output performance of dynamoDB tables for scans


* Scan of `160285` items with 1600 being returned by each scans:
  * 158.34 seconds
  * each call returing 1MB
  * requires 100 calls
Example:
```json
{
    "itemId": "id",
    "data": {
        "idAgain": "id",
        "counter": "counter",
        "someArray": [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
        ],
        "someArray4": [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
        ],
        "someArray2": [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
        ],
        "someArray3": [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
        ],
        "nestedObject": {
            "nestedObject": {
                "nestedObject": {
                    "nestedObject": {
                        "nestedObject": {
                            "nestedObject": {
                                "hello: true
                            }
                        }
                    }
                }
            }
        },
        longData: '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    }
}
```

* Scan of `174106` items with 10486 being return each scan attempt
  * Read capability at 100
  * 66.85 seconds
  * 1MB per return
  * requires 18 calls
With data like:
```json
{
    "itemId": "id",
    "data": {
        "idAgain": "id",
    }
}
```
