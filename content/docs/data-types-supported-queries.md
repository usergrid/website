---
title: Data types supported in queries
category: docs
layout: docs
---

Data types supported in queries
===============================

As you develop queries for your Apache Usergrid data, remember that entity
properties each conform to a particular data type (whether the entity is
included by default or an entity you defined). Your queries must
acknowledge this, testing with values that conform to each property's
data type. (You can view the list of property data types for the default
entities at [Default Data Entities](/default-data-entities).)

For example, in the default entity `User`, the `name` property is stored
as a `string`, the created date as a `long`, and metadata is stored as a
JSON object. Your queries must be data type-aware so that you can be
sure that query results are as you expect them to be.

So imagine you define an entity with a `price` property whose value
might be `100.00`. Querying for `100` will return no results even if
there are occurrences of `100.00` as `price` values in your data set.
That's because the database expected a decimal-delimited `float` value
in your query.

+-------------------------+-------------------------+-------------------------+
| Data Type               | Examples                | Notes                   |
+=========================+=========================+=========================+
| `string`                | `'value'`,              |                         |
|                         | `unicode '\uFFFF'`,     |                         |
|                         | `octal '\0707'`         |                         |
+-------------------------+-------------------------+-------------------------+
| `long`                  |     1357412326021       | Timestamps are          |
|                         |                         | typically stored as     |
|                         |                         | `long` values.          |
+-------------------------+-------------------------+-------------------------+
| `float`                 |     10.1, -10.1, 10e10, | Your query must be      |
|                         |  10e-10, 10E10, 10E-10  | specific about the      |
|                         |                         | value you're looking    |
|                         |                         | for, down to the value  |
|                         |                         | (if any) after the      |
|                         |                         | decimal point.          |
+-------------------------+-------------------------+-------------------------+
| `boolean`               |     true | false        |                         |
+-------------------------+-------------------------+-------------------------+
| `UUID`                  |     ee912c4b-5769-11e2- | UUID types are          |
|                         | 924d-02e81ac5a17b       | typically used for the  |
|                         |                         | unique IDs of entities. |
|                         |                         | The value must conform  |
|                         |                         | to the following format |
|                         |                         | (do not enclose with    |
|                         |                         | quotation marks):       |
|                         |                         |     xxxxxxxx-xxxx-xxxx- |
|                         |                         | xxxx-xxxxxxxxxxxx       |
|                         |                         |                         |
|                         |                         | .                       |
+-------------------------+-------------------------+-------------------------+
| `object`                | For a JSON object like  | Objects are often used  |
|                         | this one:               | to contain entity       |
|                         |                         | metadata, such as the   |
|                         |     {                   | activities associated   |
|                         |      "items": [         | with a user, the users  |
|                         |       {                 | associated with a role, |
|                         |        "name": "rocks"  | and so on.              |
|                         |       },                |                         |
|                         |       {                 |                         |
|                         |        "name": "boats"  |                         |
|                         |       }                 |                         |
|                         |      ]                  |                         |
|                         |     }                   |                         |
|                         |                         |                         |
|                         | ... you can use dot     |                         |
|                         | notation to reach       |                         |
|                         | property values in the  |                         |
|                         | object:                 |                         |
|                         |                         |                         |
|                         |     /mycollection/thing |                         |
|                         | ?ql="select * where ite |                         |
|                         | ms.name = 'rocks'"      |                         |
+-------------------------+-------------------------+-------------------------+


