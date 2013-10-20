---
title: Query response values
category: docs
layout: docs
---

When you query Apache Usergrid data, the query’s response is formatted in
JavaScript Object Notation (JSON). This is a common format used for
parameter and return values in REST web services.

So for the following query:

    /users?ql=select * where name = ‘Gladys Kravitz’

...you would get a response such as the the one below. The JSON format
arranges the data in name/value pairs. Many of the values correspond to
specifics of the request, including the request’s HTTP action (GET), the
application’s UUID, the request’s parameters (the query string you
sent), and so on.

> **Note:**Query examples in this content are shown unencoded to make
> them easier to read. Keep in mind that you might need to encode query
> strings if you're sending them as part of URLs, such as when you're
> executing them with the cURL tool.

Here, the query is asking for whole entities in the users collection.
Data corresponding to the response is captured in the response’s
`entities` array. The array has one member here, corresponding to the
one user found by the query (another kind of query might have found more
users). That one member gives the UUID of the entity (user), the entity
type, and values for properties such as name, username, email, and so
on.

```js
{
  "action" : "get",
  "application" : "8272c9b0-d86a-11e2-92e2-cdf1ce04c1c0",
  "params" : {
    "ql" : [ "select * where name = 'Gladys Kravitz'" ]
  },
  "path" : "/users",
  "uri" : "http://api.usergrid.com/myorg/myapp/users",
  "entities" : [ {
    "uuid" : "d0d7d0ba-e97b-11e2-8cef-411c466c4f2c",
    "type" : "user",
    "name" : "Gladys Kravitz",
    "created" : 1373472876859,
    "modified" : 1373472876859,
    "username" : "gladys",
    "email" : "gladys@example.com",
    "activated" : true,
    "picture" : "http://www.gravatar.com/avatar/20c57d4f41cf51f2db44165eb058b3b2",
    "metadata" : {
      "path" : "/users/d0d7d0ba-e97b-11e2-8cef-411c466c4f2c",
      "sets" : {
        "rolenames" : "/users/d0d7d0ba-e97b-11e2-8cef-411c466c4f2c/rolenames",
        "permissions" : "/users/d0d7d0ba-e97b-11e2-8cef-411c466c4f2c/permissions"
      },
      "connections" : {
        "firstname" : "/users/d0d7d0ba-e97b-11e2-8cef-411c466c4f2c/firstname",
        "lastname" : "/users/d0d7d0ba-e97b-11e2-8cef-411c466c4f2c/lastname"
      },
      "collections" : {
        "activities" : "/users/d0d7d0ba-e97b-11e2-8cef-411c466c4f2c/activities",
        "devices" : "/users/d0d7d0ba-e97b-11e2-8cef-411c466c4f2c/devices",
        "feed" : "/users/d0d7d0ba-e97b-11e2-8cef-411c466c4f2c/feed",
        "groups" : "/users/d0d7d0ba-e97b-11e2-8cef-411c466c4f2c/groups",
        "roles" : "/users/d0d7d0ba-e97b-11e2-8cef-411c466c4f2c/roles",
        "following" : "/users/d0d7d0ba-e97b-11e2-8cef-411c466c4f2c/following",
        "followers" : "/users/d0d7d0ba-e97b-11e2-8cef-411c466c4f2c/followers"
      }
    }
  } ],
  "timestamp" : 1374694196061,
  "duration" : 48,
  "organization" : "myorg",
  "applicationName" : "myapp",
  "count" : 1
}
```

Compare the preceding example with the following for another kind of
query. Imagine the following request string, where the query string is
asking for only the values of two of the entity’s properties (username
and name):

    /users?ql=select username,name where name=’Gladys Kravitz’

In the response JSON from this query, the return value is specified as
the property of the `list` item -- here, an array containing only the
values of the properties the query asked for, in the order they were
requested (username first, then name).

    {
      "action" : "get",
      "application" : "8272c9b0-d86a-11e2-92e2-cdf1ce04c1c0",
      "params" : {
        "ql" : [ "select username,name where name='Gladys Kravitz'" ]
      },
      "path" : "/users",
      "uri" : "http://api.usergrid.com/myorg/myapp/users",
      "list" : [ [ "gladys", "Gladys Kravitz" ] ],
      "timestamp" : 1374697463190,
      "duration" : 25,
      "organization" : "myorg",
      "applicationName" : "myapp",
      "count" : 1
    }
