#!/usr/bin/env node
try {
  require('../src')(process.argv)
} catch (err) {
    console.log(Error(err))
}
