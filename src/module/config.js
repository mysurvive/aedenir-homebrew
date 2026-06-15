export function registerHandlebarsHelpers() {
  Handlebars.registerHelper(
    "when",
    function (this, op1, operator, op2, opts) {
      const operators = {
          eq: function (l, r) {
            return l === r;
          },
          noteq: function (l, r) {
            return l !== r;
          },
          gt: function (l, r) {
            return l > r;
          },
          gte: function (l, r) {
            return l >= r;
          },
          lt: function (l, r) {
            return l < r;
          },
          lte: function (l, r) {
            return l <= r;
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
    },
  );
}
