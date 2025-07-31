# Changelog

## 0.6.1

* Environment variables are now passed on to the Gren compiler, allowing you to set
`GREN_BIN`.
* Removes post-processing that adds `/* @__PURE__ */` annotations for improved dead-code
elimination. Similar annotations are added by the 0.6.1 Gren compiler.

## 0.6.0

* Initial release
