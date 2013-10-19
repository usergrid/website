---
title: Assets
category: docs
layout: docs
---

Asset entities are used primarily in Apache Usergrid to manage binary data
objects such as images, video, and audio content. However, an asset does
not have to be used for a binary object. For example, assets can be used
to model a file system.

Using App services APIs you can create, retrieve, update, delete, and
query asset entities. See You do not have access to view this node for
descriptions of these APIs.

Asset properties
----------------

The following are the system-defined properties for asset entities. You
can create application-specific properties for an asset entity in
addition to the system-defined properties. The system-defined properties
are reserved. You cannot use these names to create other properties for
an asset entity. In addition the assets name is reserved for the assets
collection — you can't use it to name another collection.

  Property       Type     Description
  -------------- -------- ---------------------------------------------------------------------------------
  uuid           UUID     Asset’s unique entity ID
  type           string   "asset"
  name           string   Asset name (mandatory)
  created        long     [UNIX timestamp](http://en.wikipedia.org/wiki/Unix_time) of entity creation
  modified       long     [UNIX timestamp](http://en.wikipedia.org/wiki/Unix_time) of entity modification
  owner          UUID     UUID of the asset’s owner (mandatory)
  path           string   Relative path to the asset (mandatory)
  content-type   string   Content type of the asset (for example, “image/jpeg”)

Set property
------------

Assets have the following set property.

  Set           Type     Description
  ------------- -------- ----------------------------------
  connections   string   Set of connections for the asset

 
