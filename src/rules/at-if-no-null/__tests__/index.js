"use strict";

const { messages, ruleName } = require("..");

testRule({
  ruleName,
  config: [true],
  customSyntax: "postcss-scss",

  accept: [
    {
      code: `a {
      @if $x {}
    }`,
      description: "does not use the != null format"
    },
    {
      code: `a {
      @if not $x {}
    }`,
      description: "does not use the == null format"
    },
    {
      code: `a {
      @if $x != null and $x > 1 {}
    }`,
      description: "does not use the == null format"
    }
  ],

  reject: [
    {
      code: `a {
      @if $x == null {}
    }`,
      description: "uses the == null format",
      message: messages.equals_null,
      line: 2
    },
    {
      code: `a {
      @if $x != null {}
    }`,
      description: "uses the != null format",
      message: messages.not_equals_null,
      line: 2
    }
  ]
});
