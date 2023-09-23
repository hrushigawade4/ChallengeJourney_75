const YourContract = artifacts.require("ChallengeJourney_75");

contract("ChallengeJourney_75", (accounts) => {
  it("should do something", async () => {
    const instance = await YourContract.deployed();
    const result = await instance.addProgressUpdate("Wake up"); // Replace with your contract's function
    const expectedValue = await instance.getProgressCount();
    assert.equal(result, expectedValue, "Function did not return the expected value");
  });
});
