describe("Directive: SmartModule.scCalendar",function(){var e,t;beforeEach(module("SmartCourtLib")),beforeEach(inject(function(n,r){t=r.$new(),e=angular.element("<Replace with directive>"),n(e)(t),t.$apply()})),it("should not render empty html",function(){t.$apply(function(){}),expect(e.html()).not.toBe("")})})