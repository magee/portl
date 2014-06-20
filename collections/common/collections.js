/**
 * Created by mageemooney on 6/19/14.
 */
/*
  Meteor loads deeply nested files first so this is installed in collections
  subfolder to ensure it loads before each of the collection-specific js files.
 */

// Most schema objects are defined in collection-specific js files in /collections
//TODO: namespacing for app so globals aren't in Window namespace
Schemas = {};
