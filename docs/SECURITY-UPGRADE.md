# Security Upgrade

## 1. Runtime and Dependencies

Use a supported Node.js LTS release at version 22 or later. The dependency lock was regenerated without running package scripts. Express, Handlebars, JWT, Morgan, Mongoose, and Socket.IO receive patched versions. Mongoose stays on the callback-compatible 6.x line for this change. Socket.IO 4 accepts Engine.IO 3 handshakes so existing Socket.IO 2 clients can migrate gradually. Legacy development dependencies are replaced by the native Node.js watch mode.

<div style="break-before: page;"></div>

## 2. Image Uploads and Credentials

The unmaintained base64-img dependency is replaced by an internal writer. Uploads accept raster PNG, JPEG, GIF, and WebP, cap decoded size at 5 MiB, reject traversal and misleading content types, and never overwrite existing files. SVG uploads are rejected. Post creation waits for image writes instead of a fixed timer.

A previously committed database credential comment is removed. Revoke that credential if its provider still exists. Supply production `MONGODB_URI` and `JWT_SECRET` through deployment configuration.

Run `npm ci --ignore-scripts`, `npm test`, and `npm audit` on a trusted machine. Database and end-to-end client integration checks still require a test deployment.
