const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
    deployer.deploy(Migrations, { gas: 2000000, gasPrice: 1000000000 });
};
