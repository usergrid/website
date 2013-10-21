---
title: Working with queries
category: docs
layout: docs
---

Working with queries
====================

When querying your Apache Usergrid data, you can use your query string to
get the data, then sort and manage it on the client. This topic
describes a few useful techniques.

> **Note**: For introductory information about queries, be sure to see
> [Apache Usergrid data query overview](/app-services-data-query-overview).

> **Note:**Query examples in this content are shown unencoded to make
> them easier to read. Keep in mind that you might need to encode query
> strings if you're sending them as part of URLs, such as when you're
> executing them with the cURL tool.

Retrieving values for multiple properties
-----------------------------------------

Your query can return multiple kinds of values -- such as the values of
multiple properties -- by specifying the property names in your select
statement as a comma-separated list.

For example, the following request returns the address and phone number
of users whose name is Gladys Kravitz:

    /users?ql=select address,phone_number where name = 'Gladys Kravitz'

Querying for the contents of text
---------------------------------

Your query can search the text of entity values of the string data type.
For example, you can search a postal code field for values that start
with a specific three numbers.

For example, the following query selects all restaurants with the word
`diner` in the name:

    /restaurants?ql=select * where name contains 'diner'

> **Note:** Not all string properties of the default entities are
> indexed for searching. This includes the `User` entity's `username`
> property.

The following table lists a few examples of the kind of searches you can
do in queries.

+-------------------------+-------------------------+-------------------------+
| Goal                    | Example                 | Notes                   |
+=========================+=========================+=========================+
| Find users whose name   |     /users?ql=select *  | `contains`looks for the |
| value contains the full | where name contains 'Kr | occurrence of a full    |
| word "Kravitz".         | avitz'                  | word anywhere in the    |
|                         |                         | searched property.      |
+-------------------------+-------------------------+-------------------------+
| Find users whose name   |     /users?ql=select *  | `contains`will look for |
| value contains a word   | where name contains 'Kr | partial words if you    |
| that starts with        | av*'                    | include a wildcard.     |
| "Krav".                 |                         |                         |
+-------------------------+-------------------------+-------------------------+
| Find users whose name   |     /users?ql=select *  | The `=` operator is     |
| value is exactly and    | where name = 'Gladys Kr | looking for a match in  |
| only "Gladys Kravitz".  | avitz'                  | the entire searched     |
|                         |                         | property value. Use a   |
|                         |                         | `*` wildcard to look    |
|                         |                         | for some set of the     |
|                         |                         | first characters only.  |
+-------------------------+-------------------------+-------------------------+
| Find stores whose       |     /stores?ql=location | `within`will test for   |
| locations are within    | .coordinates within .5  | values within the value |
| the specified longitude | of 40.042016, -86.90074 | you specify. The        |
| and latitude.           | 9                       | `within` value is       |
|                         |                         | expressed as a number   |
|                         |                         | of meters.              |
|                         |                         |                         |
|                         |                         | The return results are  |
|                         |                         | sorted in order of      |
|                         |                         | nearest to furthest. If |
|                         |                         | there are multiple      |
|                         |                         | entries at the same     |
|                         |                         | location, they're       |
|                         |                         | returned in the order   |
|                         |                         | they were added to the  |
|                         |                         | database.               |
+-------------------------+-------------------------+-------------------------+

Sorting results
---------------

You can return query results that are sorted in the order you specify.
Use the `order by` clause to specify the property to sort by, along with
the order in which results should be sorted. The syntax for the clause
is as follows:

    order by <property_name> asc | desc

The following table includes a few examples:

+--------------------------------------+--------------------------------------+
| Goal                                 | Example                              |
+======================================+======================================+
| Sort by first name in ascending      |     /users?ql=select * where lastnam |
| order                                | e = 'Smith' order by firstname asc   |
+--------------------------------------+--------------------------------------+
| Sort by first name in descending     |     /users?ql=select * where lastnam |
| order                                | e = 'Smith' order by firstname desc  |
+--------------------------------------+--------------------------------------+
| Sort by last name, then first name   |     /users?ql=select * where lastnam |
| in ascending order                   | e contains 'Sm*' order by lastname a |
|                                      | sc, firstname asc                    |
+--------------------------------------+--------------------------------------+

Managing large sets of results
------------------------------

When your query might return more results than you want to display to
the user at once, you can use the limit parameter with cursors or API
methods to manage the display of results. By default, query results are
limited to 10 at a time. You can adjust this by setting the limit
parameter to a value you prefer.

For example, you might execute a query that could potentially return
hundreds of results, but you want to display 20 of those at a time to
users. To do this, your code sets the limit parameter to 20 when
querying for data, then provides a way for the user to request more of
the results when they're ready.

You would use the following parameters in your query:

+-------------------------+-------------------------+-------------------------+
| Parameter               | Type                    | Description             |
+=========================+=========================+=========================+
| `limit`                 | integer                 | Number of results to    |
|                         |                         | return. The maximum     |
|                         |                         | number of results is    |
|                         |                         | 1,000. Specifying a     |
|                         |                         | limit greater than      |
|                         |                         | 1,000 will result in a  |
|                         |                         | limit of 1,000.         |
|                         |                         |                         |
|                         |                         | Limit is applied to the |
|                         |                         | collection, not the     |
|                         |                         | query string. For       |
|                         |                         | example, the following  |
|                         |                         | query will find the     |
|                         |                         | first 100 entities in   |
|                         |                         | the books collection,   |
|                         |                         | then from that set      |
|                         |                         | return the ones with    |
|                         |                         | author='Hemingway':     |
|                         |                         |                         |
|                         |                         |     /books?ql=author =  |
|                         |                         | 'Hemingway'&limit=100   |
|                         |                         |                         |
|                         |                         | You can also use the    |
|                         |                         | limit parameter on a    |
|                         |                         | request without a query |
|                         |                         | string. The following   |
|                         |                         | example is shorthand    |
|                         |                         | for selecting all books |
|                         |                         | and limiting by 100 at  |
|                         |                         | a time:                 |
|                         |                         |                         |
|                         |                         |     /books?limit=100    |
|                         |                         |                         |
|                         |                         | Using a limit on a      |
|                         |                         | DELETE can help you     |
|                         |                         | manage the amount of    |
|                         |                         | time it takes to delete |
|                         |                         | data. For example you   |
|                         |                         | can delete all of the   |
|                         |                         | books, 1000 at a time,  |
|                         |                         | with the following:     |
|                         |                         |                         |
|                         |                         |     DELETE /books?limit |
|                         |                         | =1000                   |
|                         |                         |                         |
|                         |                         | Keep in mind that       |
|                         |                         | DELETE operations can   |
|                         |                         | take longer to execute. |
|                         |                         | Yet even though the     |
|                         |                         | DELETE query call might |
|                         |                         | time out (such as with  |
|                         |                         | a very large limit),    |
|                         |                         | the operation will      |
|                         |                         | continue on the server  |
|                         |                         | even if the client      |
|                         |                         | stops waiting for the   |
|                         |                         | result.                 |
+-------------------------+-------------------------+-------------------------+
| `cursor`                | string                  | An encoded              |
|                         |                         | representation of the   |
|                         |                         | query position pointing |
|                         |                         | to a set of results. To |
|                         |                         | retrieve the next set   |
|                         |                         | of results, pass the    |
|                         |                         | cursor with your next   |
|                         |                         | call for most results.  |
+-------------------------+-------------------------+-------------------------+

For example:

Select all users whose name starts with fred, and returns the first 50
results:

    /users?ql=select * where name = 'fred*'&limit=50

Retrieve the next batch of users whose name is "fred", passing the
cursor received from the last request to specify where the next set of
results should begin:

    /users?ql=select * where name = 'fred*'&limit=50&cursor=LTIxNDg0NDUxNDpnR2tBQVFFQWdITUFDWFJ2YlM1emJXbDBhQUNBZFFBUUQyMVZneExfRWVLRlV3TG9Hc1doZXdDQWRRQVFIYVdjb0JwREVlS1VCd0xvR3NWT0JRQQ
