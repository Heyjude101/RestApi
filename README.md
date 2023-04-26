# RestApi

Api link: https://ritikapi.onrender.com/api/check

Sample Request 1:

```
{ “date”:”2023-04-12”,”time”:”11:00”}
```

Sample Output:
```
{
  isAvailable: true
}
```

![](https://github.com/Heyjude101/RestApi/blob/49101160983b3284e9bbd3375e067a90c1928bb9/ssapi.jpg)

Sample Request 2:

```
{ “date”:”2023-04-12”,”time”:”17:00”}
```

Sample Output:
```
{
    "isAvailable": false,
    "nextAvailableSlot": {
        "date": "23-04-13",
        "time": "09:30"
    }
}
```


![](https://github.com/Heyjude101/RestApi/blob/49101160983b3284e9bbd3375e067a90c1928bb9/ssapi2.jpg)
