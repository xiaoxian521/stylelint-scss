"use strict";

const { messages, ruleName } = require("..");
testRule({
  ruleName,
  config: [true],
  customSyntax: "postcss-scss",

  accept: [
    {
      code: `
      p {
        &.foo {}
      }
    `,
      description: "when an ampersand is chained with class"
    },
    {
      code: `
      p {
        .foo > & {}
      }
    `,
      description: "when an ampersand follows a direct descendant operator"
    },
    {
      code: `
      p {
        .foo  >  & {}
      }
    `,
      description:
        "when an ampersand follows a direct descendant operator and there are extra spaces"
    },
    {
      code: `
      p {
        .foo>& {}
      }
    `,
      description:
        "when an ampersand follows a direct descendant operator and there are no spaces"
    },
    {
      code: `
      p {
        & + & {}
        & ~ & {}
      }
    `,
      description: "when an ampersand precedes a sibling operator"
    },
    {
      code: `
      p {
        & + &:hover {}
      }
    `,
      description: "when multiple ampersands exist with one concatenated"
    },
    {
      code: `
      p {
        &,
        .foo,
        .bar {
          margin: 0;
        }
      }
    `,
      description:
        "when an ampersand is used in a comma sequence to DRY up code"
    },
    {
      code: `
      .icon {
        &-small {}
      }
    `,
      description: "when an ampersand is used in concatenation"
    },
    {
      code: `
      .icon {
        & & {}
      }
    `,
      description: "when an ampersand following an ampersand"
    },
    {
      code: `
      .icon {
        & &-small {}
      }
    `,
      description:
        "when an ampersand is used in concatenation following an ampersand"
    },
    {
      code: `
      div[id="foo&bar"] {
        &.foo {}
      }
    `,
      description: "when an ampersand is used in an attribute selector"
    },
    {
      code: `
      .foo {
        &bar {
          &baz {}
        }
      }
    `,
      description:
        "when an ampersand is used to combine three parts of a classname"
    },
    {
      code: `
      .foo {
        &bar {}
      }
    `,
      description:
        "when an ampersand is used to combine two parts of a classname"
    },
    {
      code: `
      .block {
        &__element {}
      }
    `,
      description: "when BEM syntax element is used"
    },
    {
      code: `
      .block {
        &--modifier {}
      }
    `,
      description: "when BEM syntax modifier is used"
    }
  ],

  reject: [
    {
      code: `
      p {
        & > a {}
      }
    `,
      line: 3,
      message: messages.rejected,
      description: "when an ampersand precedes a direct descendant operator"
    },
    {
      code: `
      p {
        &  >  a {}
      }
    `,
      line: 3,
      message: messages.rejected,
      description:
        "when an ampersand precedes a direct descendant operator and there are extra spaces"
    },
    {
      code: `
      p {
        &>a{}
      }
    `,
      line: 3,
      message: messages.rejected,
      description:
        "when an ampersand precedes a direct descendant operator and there are no spaces"
    },
    {
      code: `
      p {
        & a {}
      }
    `,
      line: 3,
      message: messages.rejected,
      description: "when an ampersand precedes an element"
    },
    {
      code: `
      p {
        & .class {}
      }
    `,
      line: 3,
      message: messages.rejected,
      description: "when an ampersand precedes a class"
    },
    {
      code: `
      .foo {
        &bar {
          & .class {}
        }
      }
    `,
      line: 4,
      message: messages.rejected,
      description:
        "when an ampersand is used to combine two parts of a classname and an ampersand precedes a class"
    },
    {
      code: `
      p {
        & span .class {}
      }
    `,
      line: 3,
      message: messages.rejected,
      description: "when an ampersand precedes an element and a class"
    },
    {
      code: `
      p {
        & span > .class {}
      }
    `,
      line: 3,
      message: messages.rejected,
      description:
        "when an ampersand precedes an element, a child selector and a class"
    },
    {
      code: `
      p {
        & + .foo {}
      }
    `,
      line: 3,
      message: messages.rejected,
      description: "when an ampersand precedes a sibling operator"
    },
    {
      code: `
      p {
        & ~ .foo {}
      }
    `,
      line: 3,
      message: messages.rejected,
      description: "when an ampersand precedes a sibling operator"
    },
    {
      code: `
      p {
        &  .class {}
      }
    `,
      line: 3,
      message: messages.rejected,
      description:
        "when an ampersand precedes a class and there are extra spaces"
    },
    {
      code: `
      p {
        & #class {}
      }
    `,
      line: 3,
      message: messages.rejected,
      description: "ampersand followed by id"
    },
    {
      code: `
      p {
        &  [class] {}
      }
    `,
      line: 3,
      message: messages.rejected,
      description: "ampersand followed by attribute selector"
    },
    {
      code: `
      p {
        & %class {}
      }
    `,
      line: 3,
      message: messages.rejected,
      description: "ampersand followed by %placeholder"
    },
    {
      code: `
      p {
        &
        span{}
      }
    `,
      line: 3,
      message: messages.rejected,
      description: "ampersand followed by newline and tag selector"
    },
    {
      code: `
      p {
        & {}
      }
    `,
      line: 3,
      message: messages.rejected,
      description: "when an ampersand is used by itself"
    },
    {
      code: `
      p {
          &   {}
      }
    `,
      line: 3,
      message: messages.rejected,
      description:
        "when an ampersand is used by itself and there are extra spaces"
    },
    {
      code: `
      .a {
        .b .c,
        & .d {}
      }
    `,
      line: 4,
      message: messages.rejected,
      description: "multiple nested selectors"
    },
    {
      code: `
      .foo {
        &,
        & .bar {
          color: #f00;
        }
      }
    `,
      line: 4,
      message: messages.rejected,
      description:
        "when an ampersand is used in a comma sequence followed by a class"
    },
    {
      code: `
      @theme: ~'dark';
      p {
        & when (@theme = dark) {
          color: #000;
        }
        & when not (@theme = dark) {
          color: #fff;
        }
      }
    `,
      warnings: [
        {
          line: 4,
          column: 9,
          message: messages.rejected
        },
        {
          line: 7,
          column: 9,
          message: messages.rejected
        }
      ],
      description: "when the ampersand is followed by an unknown keyword"
    }
  ]
});

testRule({
  ruleName,
  config: [true, { ignoreKeywords: ["when", /regex/] }],
  customSyntax: "postcss-scss",
  accept: [
    {
      code: `
        @theme: ~'dark';
        p {
          & when (@theme = dark) {
            color: #000;
          }
          & when not (@theme = dark) {
            color: #fff;
          }
        }
      `,
      description: "when an ampersand is followed by a keyword"
    },
    {
      code: `
        .breadcrumb {
          & > span:last-child &-separator {
            display: none;
          }
        }
      `,
      description: "when there are multiple reference nesting"
    },
    {
      code: `
        @theme: ~'dark';
        p {
          & regex (@theme = dark) {}
          & regex not (@theme = dark) {}
        }
      `,
      description: "should support the use of regular option"
    }
  ]
});
