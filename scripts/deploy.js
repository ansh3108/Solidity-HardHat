const { ethers, run } = require("hardhat");

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying Contract...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log(`Deployed contract to: ${simpleStorage.address}`);

    const currentValue = await simpleStorage.retrieve();
    console.log(`Current value is: ${currentValue}`);
    
    const transactionResponse=await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue=await simpleStorage.retrieve();
    console.log(`Updated Value is ${updatedValue}`);
}

async function verify(contractAddress, args) {
    console.log("Verifying Contract");
    try{
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch(e) {
        if(e.message.toLowerCase().includes("already verified")){
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
