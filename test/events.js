const { ethers } = require("hardhat");

async function dataProviderAddedEvent(contract) {
    const filter = {
        address: contract.address,
        topics: [ethers.utils.id('DataProviderAdded(address)')],
    }

    const events = await contract.queryFilter(filter, 'latest')
    return events[0].args
}

async function dataProviderDeletedEvent(contract) {
    const filter = {
        address: contract.address,
        topics: [ethers.utils.id('DataProviderDeleted(address)')],
    }

    const events = await contract.queryFilter(filter, 'latest')
    return events[0].args
}

async function dataProviderNameUpdatedEvent(contract) {
    const filter = {
        address: contract.address,
        topics: [ethers.utils.id('DataProviderNameUpdated(address)')],
    }

    const events = await contract.queryFilter(filter, 'latest')
    return events[0].args
}

async function dataFeedAddedEvent(contract) {
    const filter = {
        address: contract.address,
        topics: [ethers.utils.id('DataFeedAdded(address,uint256)')],
    }

    const events = await contract.queryFilter(filter, 'latest')
    return events[0].args
}

async function dataFeedDeactivatedEvent(contract) {
    const filter = {
        address: contract.address,
        topics: [ethers.utils.id('DataFeedDeactivated(address,uint256)')],
    }

    const events = await contract.queryFilter(filter, 'latest')
    return events[0].args
}

async function dataFeedActivatedEvent(contract) {
    const filter = {
        address: contract.address,
        topics: [ethers.utils.id('DataFeedActivated(address,uint256)')],
    }

    const events = await contract.queryFilter(filter, 'latest')
    return events[0].args
}

async function collateralTokenAddedEvent(contract) {
    const filter = {
        address: contract.address,
        topics: [ethers.utils.id('CollateralTokenAdded(address)')],
    }

    const events = await contract.queryFilter(filter, 'latest')
    return events[0].args
}

async function collateralTokenDeletedEvent(contract) {
    const filter = {
        address: contract.address,
        topics: [ethers.utils.id('CollateralTokenDeleted(address)')],
    }

    const events = await contract.queryFilter(filter, 'latest')
    return events[0].args
}

exports.dataProviderAddedEvent = dataProviderAddedEvent;
exports.dataProviderDeletedEvent = dataProviderDeletedEvent;
exports.dataProviderNameUpdatedEvent = dataProviderNameUpdatedEvent;
exports.dataFeedAddedEvent = dataFeedAddedEvent;
exports.dataFeedDeactivatedEvent = dataFeedDeactivatedEvent;
exports.dataFeedActivatedEvent = dataFeedActivatedEvent;
exports.collateralTokenAddedEvent = collateralTokenAddedEvent;
exports.collateralTokenDeletedEvent = collateralTokenDeletedEvent;