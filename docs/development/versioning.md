---
layout: default
title: Versioning
has_toc: false
parent: Development
nav_order: 6
---

![](../../docs/assets/HID-DPAM-svcs.png)
## Package Versioning Guidelines

### Semantic Versioning

[Learn](https://semver.org/spec/v2.0.0.html) and follow strictly the SemVer schema:

    Major.Minor.Patch[-Stage]

* Change `Major` when braking changes are introduced.
* Change `Minor` when new functionality is added, but backvard compatibility is preserved.
* Change `Patch` when existing functionalty is fixed, no new functionality is added
  and backward compatibility is preserved.
* Set `Stage` to `-alpha`, `-beta`, `-pre` etc for prereleases. Remove `Stage` for releases.
