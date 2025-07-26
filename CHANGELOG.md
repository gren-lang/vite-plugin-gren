# Changelog

## 1.1.0 (unreleased)

* Environment variables are now passed on to the Gren compiler, allowing you to set
`GREN_BIN`.
* Removes post-processing that adds `/* @__PURE__ */` annotations for improved dead-code
elimination. Similar annotations are added by the 6.0.1 compiler.

## 1.0.0

* Initial release
