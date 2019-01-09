import rule, { ruleName, messages } from "..";

testRule(rule, {
  ruleName,
  config: ["always"],
  syntax: "scss",

  accept: [
    {
      code: `
      .foo {
        .bar {}
      }
      `,
      description: "when child combinators are nested"
    },
    {
      code: `
      .foo {
        &.bar {}
      }
      `,
      description: "when chained combinators are nested"
    },
    {
      code: `
      .foo {
        & > bar {}
      }
      `,
      description: "when direct descendant combinators are nested"
    },
    {
      code: `
      .baz {
        .foo.bar & {}
      }
      `,
      description:
        "when chained combinators can't be nested due to preceding a parent selector"
    },
    {
      code: `
      .foo {
        &bar {
          &baz {}
        }
      }
      `,
      description: "when parent selectors are used for concatenation"
    },
    {
      code: `
      .foo {
        &__bar {
          &--baz {}
        }
      }
      `,
      description: "when parent selectors are used for BEM style concatenation"
    },
    {
      code: `
      .foo {
        &:hover {}
      }
      `,
      description: "when pseudo classes are nested"
    },
    {
      code: `
      .foo {
        &:nth-child(2n - 1) {}
      }
      `,
      description: "when an nth child selector is used which includes spaces"
    },
    {
      code: `
      [data-test="foo bar"] {}
      `,
      description: "when an attribute selector is used with spaces in it"
    },
    {
      code: `
      :not([class]:last-child) {}
      `,
      description: "when selectors are chained within a not selector"
    }
  ],

  reject: [
    {
      code: `
      .foo .bar {}
      `,
      description: "when a child combinator is used instead of nesting",
      messages: messages.rejected("child combinator"),
      line: 2,
      column: 12
    },
    {
      code: `
      .foo.bar {}
      `,
      description: "when a selector is chained with another",
      messages: messages.rejected("chaining"),
      line: 2,
      column: 11
    },
    {
      code: `
      .foo > .bar {}
      `,
      description:
        "when a direct descendant combinator is used without nesting",
      messages: messages.rejected("direct descendant"),
      line: 2,
      column: 14
    },
    {
      code: `
      .foo:hover {}
      `,
      description: "when pseudo classes are used without nesting",
      messages: messages.rejected("pseudo class"),
      line: 2,
      column: 11
    },
    {
      code: `
      * + li {}
      `,
      description: "when universal selectors are used with a combinator",
      messages: messages.rejected("direct sibling"),
      line: 2,
      column: 11
    },
    {
      code: `
      :nth-child(2n - 1):last-child {}
      `,
      description: "when pseudo selectors only are chained",
      messages: messages.rejected("pseudo class"),
      line: 2,
      column: 25
    }
  ]
});

testRule(rule, {
  ruleName,
  config: ["never"],
  syntax: "scss",

  accept: [
    {
      code: `
      .foo .bar {}
      `,
      description: "when a child combinator is used instead of nesting"
    },
    {
      code: `
      .foo.bar {}
      `,
      description: "when a selector is chained with another"
    },
    {
      code: `
      .foo > .bar {}
      `,
      description: "when a direct descendant combinator is used without nesting"
    },
    {
      code: `
      .foo:hover {}
      `,
      description: "when pseudo classes are used without nesting"
    },
    {
      code: `
      @media screen {
        .foo {}
      }
      `,
      description: "when selectors are nested inside @media"
    },
    {
      code: `
      @keyframes foo {
        0% {}
        100% {}
      }
      `,
      description: "when a keyframes rule is used"
    },
    {
      code: `
      @include mixin {
        .foo {}
      }
      `,
      description:
        "when selectors are nested in a mixin, e.g. when making use of @content"
    },
    {
      code: `
      .foo:nth-child(2n-1) {}
      `,
      description: "when using an nth-child selector"
    },
    {
      code: `
      #foo:not([class]:last-child) {}
      `,
      description: "when using a not selector"
    }
  ],

  reject: [
    {
      code: `
      .foo {
        .bar {}
      }
      `,
      description: "when child combinators are nested",
      messages: messages.rejected("nesting"),
      line: 3,
      column: 9
    },
    {
      code: `
      .foo {
        &.bar {}
      }
      `,
      description: "when chained combinators are nested",
      messages: messages.rejected("nesting"),
      line: 3,
      column: 9
    },
    {
      code: `
      .foo {
        & > bar {}
      }
      `,
      description: "when direct descendant combinators are nested",
      messages: messages.rejected("nesting"),
      line: 3,
      column: 9
    },
    {
      code: `
      .foo {
        &bar {
          &baz {}
        }
      }
      `,
      description: "when parent selectors are used for concatenation",
      messages: messages.rejected("nesting"),
      line: 3,
      column: 9
    },
    {
      code: `
      .foo {
        &__bar {
          &--baz {}
        }
      }
      `,
      description: "when parent selectors are used for BEM style concatenation",
      messages: messages.rejected("nesting"),
      line: 3,
      column: 9
    },
    {
      code: `
      .foo {
        &:hover {}
      }
      `,
      description: "when pseudo classes are nested",
      messages: messages.rejected("nesting"),
      line: 3,
      column: 9
    }
  ]
});
