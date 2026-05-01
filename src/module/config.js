export function registerHandlebarsHelpers() {
  Handlebars.registerHelper("when", function (op1, operator, op2, opts) {
    const operators = {
        eq: function (l, r) {
          return l == r;
        },
        noteq: function (l, r) {
          return l != r;
        },
        gt: function (l, r) {
          return Number(l) > Number(r);
        },
        or: function (l, r) {
          return l || r;
        },
        and: function (l, r) {
          return l && r;
        },
        "%": function (l, r) {
          return l % r === 0;
        },
      },
      result = operators[operator](op1, op2);

    if (result) return opts.fn(this);
    else return opts.inverse(this);
  });
}
