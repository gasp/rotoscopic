require("../src/js/utils.js");


describe("isArray", function() {
  it("detects if string is not an array", function() {
    expect(Array.isArray("hello")).toBe(false);
  });
  it("detects if int is not an array", function() {
    expect(Array.isArray(42)).toBe(false);
  });
  it("detects if object is not an array", function() {
    expect(Array.isArray({a:5})).toBe(false);
  });
  it("detects if function is not an array", function() {
    expect(Array.isArray(function(){return 1})).toBe(false);
  });
  it("detects if array is an array", function() {
    expect(Array.isArray(["foo","bar"])).toBe(true);
    expect(Array.isArray([1,"kiwi"])).toBe(true);
    expect(Array.isArray([])).toBe(true);
  });
});

describe("str2int", function() {
  it("translates string to ints", function() {
    var array = ["1",["2",["3",["4","5"],"6"]],"7"];
    array = array.str2int();
    expect(typeof(array[0])).toBe("number");
    expect(array[0]).toBe(1);
    expect(array[0]).not.toBe("1");
    expect(typeof(array[1])).toBe("object");
    expect(Array.isArray(array[1])).toBe(true);
    expect(array[1][1][1][1]).toBe(5);
  });
});
