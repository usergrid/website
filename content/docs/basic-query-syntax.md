---
title: Basic query syntax
category: docs
layout: docs
---

Basic query syntax
==================

Queries of Apigee data for Apache Usergrid are made up of two kinds of
statements: the path to the collection you want to query, followed by
the query language statement containing your query. These two statements
are separated by "?ql=" to indicate where the query language statement
starts.

> **Note:**Query examples in this content are shown unencoded to make
> them easier to read. Keep in mind that you might need to encode query
> strings if you're sending them as part of URLs, such as when you're
> executing them with the cURL tool.

> **Note:** The syntax of Apache Usergrid queries only *resembles* SQL to
> make queries familiar and easier to write. However, the language isn't
> SQL. Only the syntax items documented here are supported.

Basic syntax
------------

To retrieve items from a collection, you would use a syntax such as the
following:

    /<collection>?ql=<query_statement>

In the following example, the query is retrieving all users whose name
is Gladys Kravitz.

    /users?ql=select * where name = 'Gladys Kravitz'

The following example selects all items except those that have an a
property value of 5:

    /items?ql=select * where NOT a = 5

Note that there is a shortcut available when your query selects all
items matching certain criteria -- in other words, where you use a
statement that starts "select \* where". In this case, you can omit the
first part of the statement and abbreviate it this way:

    /items?ql=NOT a = 5

Supported operators
-------------------

The following table lists more of the operators that you can use in
queries. Others are described later in this section.

Category

Component Name

Example

Equality operations

Less than

    '<' or 'lt'

Less than equal

    '<=' or 'lte'

Equal

    '=' or 'eq'

Greater than equal

    '>=' or 'gte'

Greater than

    '>' or 'gt'

Not equal

    NOT <some_expression>

Logical operations

Intersection of results

    and

Union of results

    or

Subtraction of results

    not

 
