// const { expect } = require("chai");
// const { ethers } = require("hardhat");
// const { AddressZero } = require("../utils/constants");
// const { 
//   dataProviderAddedEvent, 
//   dataProviderDeletedEvent,
//   dataProviderNameUpdatedEvent,
//   dataFeedAddedEvent,
//   dataFeedDeactivatedEvent,
//   dataFeedActivatedEvent,
//   collateralTokenAddedEvent,
//   collateralTokenDeletedEvent
// } = require('./events')

// describe('Whitelist', () => {
//   let Whitelist, whitelist;
//   let owner, dataProvider1, dataProvider2, dataProvider3, collateralToken1, collateralToken2
//   let nameDataProvider1, nameDataProvider2
//   let dataFeed1, dataFeed2

//   beforeEach(async function () {
//       this.timeout(60000); // 60 second timeout for setup to avoid the timeout of 20000ms error
//       [owner, dataProvider1, dataProvider2, dataProvider3, collateralToken1, collateralToken2, ...addrs] = await ethers.getSigners(); // addrs[0].address is the fifth address in the list
//       nameDataProvider1 = "DataProvider 1"
//       nameDataProvider2 = "DataProvider 2"
//       publicTrigger1 = true
//       publicTrigger2 = false

//       dataFeed1 = [
//         "XBT/USD",            // referenceAsset
//         "BTC/USD",            // referenceAssetUnified
//         2,                    // roundingDecimals
//         "https://kraken.com", // dataSourceLink
//         true,                 // active
//       ]

//       dataFeed2 = [
//         "ETH/USD",            // referenceAsset
//         "ETH/USD",            // referenceAssetUnified
//         5,                    // roundingDecimals
//         "https://arweave.io", // dataSourceLink
//         true,                 // active
//       ]
      
//       Whitelist = await ethers.getContractFactory('Whitelist');
//       whitelist = await Whitelist.deploy();  

//     });
  
//   describe('Initialization', () => {
//     it('initializes the owner', async() => {  
//       expect(await whitelist.owner()).to.eq(owner.address)
//     })
//   })
  
//   describe('addDataProviders', () => {
//     it('should allow the contract owner to whitelist one data provider', async() => {  
//       const dataProviderInfoBefore = await whitelist.getDataProvider(dataProvider1.address)
//       expect(dataProviderInfoBefore.name).is.eq('')
//       expect(dataProviderInfoBefore.publicTrigger).to.be.false
      
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
      
//       const dataProviderInfoAfter = await whitelist.getDataProvider(dataProvider1.address)
//       expect(dataProviderInfoAfter.name).to.eq("DataProvider 1")
//       expect(dataProviderInfoAfter.publicTrigger).to.eq(publicTrigger1)
//     })

//     it('should allow the contract owner to whitelists two data providers', async() => {  
//       const dataProvider1InfoBefore = await whitelist.getDataProvider(dataProvider1.address)
//       expect(dataProvider1InfoBefore.name).is.eq('')
//       expect(dataProvider1InfoBefore.publicTrigger).to.be.false

//       const dataProvider2InfoBefore = await whitelist.getDataProvider(dataProvider2.address)
//       expect(dataProvider2InfoBefore.name).is.eq('')
//       expect(dataProvider2InfoBefore.publicTrigger).to.be.false
      
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address, dataProvider2.address], [[nameDataProvider1, publicTrigger1], [nameDataProvider2, publicTrigger2]])
      
//       const dataProvider1InfoAfter = await whitelist.getDataProvider(dataProvider1.address)
//       expect(dataProvider1InfoAfter.name).to.eq("DataProvider 1")
//       expect(dataProvider1InfoAfter.publicTrigger).to.eq(publicTrigger1)

//       const dataProvider2InfoAfter = await whitelist.getDataProvider(dataProvider2.address)
//       expect(dataProvider2InfoAfter.name).to.eq("DataProvider 2")
//       expect(dataProvider2InfoAfter.publicTrigger).to.eq(publicTrigger2)
//     })

//     it('should not allow a non-contract-owner to whitelist a data provider', async() => {  
//       await expect(whitelist.connect(dataProvider1).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])).to.be.revertedWith("Ownable: caller is not the owner")
//     })

//     it('should revert if data provider array length <> name array length', async() => {  
//       await expect(whitelist.connect(owner).addDataProviders([dataProvider1.address, dataProvider2.address], [[nameDataProvider1, publicTrigger1]])).to.be.revertedWith("Whitelist: different length")
//     })

//     it('should revert if dataProvider name is an empty string', async() => {  
//       const invalidName = ''
//       await expect(whitelist.connect(owner).addDataProviders([dataProvider1.address], [[invalidName, publicTrigger1]])).to.be.revertedWith("Whitelist: no name")
//     })

//     it('should revert if the provided address is the zero address', async() => {  
//       await expect(whitelist.connect(owner).addDataProviders([AddressZero], [[nameDataProvider1, publicTrigger1]])).to.be.revertedWith("Whitelist: null address")
//     })

//     it('should revert if dataProvider already exists', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])

//       await expect(whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])).to.be.revertedWith("Whitelist: entry already exists")
//     })

//     it('should emit a `DataProviderAdded` event', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])

//       const event = await dataProviderAddedEvent(whitelist)
//       expect(event.providerAddress).to.eq(dataProvider1.address)
//     })

//   })

//   describe('deleteDataProviders', () => {
//     it('should allow the contract owner to delete a data provider from the whitelist', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
      
//       await whitelist.connect(owner).deleteDataProviders([dataProvider1.address])
      
//       const dataProviderInfo = await whitelist.getDataProvider(dataProvider1.address)
//       expect(dataProviderInfo.name).to.eq('')
//       expect(dataProviderInfo.publicTrigger).to.be.false
//     })

//     it('should allow the contract owner to delete two data providers from the whitelist', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address, dataProvider2.address], [[nameDataProvider1, publicTrigger1], [nameDataProvider2, publicTrigger2]])
      
//       await whitelist.connect(owner).deleteDataProviders([dataProvider1.address, dataProvider2.address])
      
//       const dataProvider1Info = await whitelist.getDataProvider(dataProvider1.address)
//       expect(dataProvider1Info.name).to.eq('')
//       expect(dataProvider1Info.publicTrigger).to.be.false

//       const dataProvider2Info = await whitelist.getDataProvider(dataProvider2.address)
//       expect(dataProvider2Info.name).to.eq('')
//       expect(dataProvider2Info.publicTrigger).to.be.false
//     })

//     it('should not allow a non-contract-owner to delete a data provider from the whitelist', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])

//       await expect(whitelist.connect(dataProvider1).deleteDataProviders([dataProvider1.address])).to.be.revertedWith("Ownable: caller is not the owner")
//     })

//     it('should emit a `DataProviderDeleted` event', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
//       await whitelist.connect(owner).deleteDataProviders([dataProvider1.address])

//       const event = await dataProviderDeletedEvent(whitelist)
//       expect(event.providerAddress).to.eq(dataProvider1.address)
//     })
//   })

//   describe('updateDataProviderNames', () => {
//     it('should allow contract owner to update the name of a whitelisted data provider', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
      
//       const newDataProviderName = "New Name"
//       await whitelist.connect(owner).updateDataProviderNames([dataProvider1.address], [newDataProviderName])
      
//       const dataProviderInfo = await whitelist.getDataProvider(dataProvider1.address)
//       expect(dataProviderInfo.name).to.eq('New Name')
//       expect(dataProviderInfo.publicTrigger).to.eq(publicTrigger1)
//     })
    
//     it('should not allow a non-contract-owner to update the name of a whitelisted data provider', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
      
//       const newDataProviderName = "New Name"
//       await expect(whitelist.connect(dataProvider1).updateDataProviderNames([dataProvider1.address], [newDataProviderName])).to.be.revertedWith("Ownable: caller is not the owner")
//     })

//     it('should revert if data provider array length <> name array length', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address, dataProvider2.address], [[nameDataProvider1, publicTrigger1], [nameDataProvider2, publicTrigger2]])
      
//       const newDataProviderName = "New Name"
//       await expect(whitelist.connect(owner).updateDataProviderNames([dataProvider1.address, dataProvider2.address], [newDataProviderName])).to.be.revertedWith("Whitelist: different length")      
//     })

//     it('should revert if data provider does not yet exists', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
      
//       const newDataProviderName = "New Name"
//       await expect(whitelist.connect(owner).updateDataProviderNames([dataProvider2.address], [newDataProviderName])).to.be.revertedWith("Whitelist: does not exist")      
//     })

//     it('should emit a `DataProviderNameUpdated` event', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
//       const newDataProviderName = "New Name"
//       await whitelist.connect(owner).updateDataProviderNames([dataProvider1.address], [newDataProviderName])

//       const event = await dataProviderNameUpdatedEvent(whitelist)
//       expect(event.providerAddress).to.eq(dataProvider1.address)
//     })
//   })

//   describe('addDataFeeds', () => {
//     it('should allow the contract owner to add two data feeds', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
      
//       await whitelist.connect(owner).addDataFeeds(dataProvider1.address, [dataFeed1, dataFeed2])
      
//       const dataFeed1Info = await whitelist.getDataFeed(dataProvider1.address, 0)
//       expect(dataFeed1Info.referenceAsset).to.eq('XBT/USD')
//       expect(dataFeed1Info.referenceAssetUnified).to.eq('BTC/USD')
//       expect(dataFeed1Info.roundingDecimals).to.eq(2)
//       expect(dataFeed1Info.dataSourceLink).to.eq("https://kraken.com")
//       expect(dataFeed1Info.active).to.be.true

//       const dataFeed2Info = await whitelist.getDataFeed(dataProvider1.address, 1)
//       expect(dataFeed2Info.referenceAsset).to.eq('ETH/USD')
//       expect(dataFeed2Info.referenceAssetUnified).to.eq('ETH/USD')
//       expect(dataFeed2Info.roundingDecimals).to.eq(5)
//       expect(dataFeed2Info.dataSourceLink).to.eq("https://arweave.io")
//       expect(dataFeed2Info.active).to.be.true
//     })

//     it('should not allow a non-contract-owner to add data feeds', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])

//       await expect(whitelist.connect(dataProvider1).addDataFeeds(dataProvider1.address, [dataFeed1, dataFeed2])).to.be.revertedWith("Ownable: caller is not the owner")
//     })

//     it('should revert if referenceAsset is an empty string', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
      
//       dataFeed1[0] = ''
//       await expect(whitelist.connect(owner).addDataFeeds(dataProvider1.address, [dataFeed1])).to.be.revertedWith("Whitelist: Invalid inputs")      
//     })

//     it('should revert if referenceAssetUnified is an empty string', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
      
//       dataFeed1[1] = ''
//       await expect(whitelist.connect(owner).addDataFeeds(dataProvider1.address, [dataFeed1])).to.be.revertedWith("Whitelist: Invalid inputs")      
//     })

//     it('should revert if dataSourceLink is an empty string', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
      
//       dataFeed1[3] = ''
//       await expect(whitelist.connect(owner).addDataFeeds(dataProvider1.address, [dataFeed1])).to.be.revertedWith("Whitelist: Invalid inputs")      
//     })

//     it('should emit a `DataFeedAdded` event', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
//       await whitelist.connect(owner).addDataFeeds(dataProvider1.address, [dataFeed1, dataFeed2])

//       const event = await dataFeedAddedEvent(whitelist)
//       expect(event.providerAddress).to.eq(dataProvider1.address)
//       expect(event.index).to.eq(0)
//     })
//   })

//   describe('deactivateDataFeeds', () => {
//     it('allows the contract owner to deactivate a data feed if triggered by contract owner', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
//       await whitelist.connect(owner).addDataFeeds(dataProvider1.address, [dataFeed1, dataFeed2])

//       await whitelist.connect(owner).deactivateDataFeeds(dataProvider1.address, [0, 1])
      
//       const dataFeed1Info = await whitelist.getDataFeed(dataProvider1.address, 0)
//       expect(dataFeed1Info.referenceAsset).to.eq('XBT/USD')
//       expect(dataFeed1Info.referenceAssetUnified).to.eq('BTC/USD')
//       expect(dataFeed1Info.roundingDecimals).to.eq(2)
//       expect(dataFeed1Info.dataSourceLink).to.eq("https://kraken.com")
//       expect(dataFeed1Info.active).to.be.false

//       const dataFeed2Info = await whitelist.getDataFeed(dataProvider1.address, 1)
//       expect(dataFeed2Info.referenceAsset).to.eq('ETH/USD')
//       expect(dataFeed2Info.referenceAssetUnified).to.eq('ETH/USD')
//       expect(dataFeed2Info.roundingDecimals).to.eq(5)
//       expect(dataFeed2Info.dataSourceLink).to.eq("https://arweave.io")
//       expect(dataFeed2Info.active).to.be.false
//     })

//     it('deactivates a data feed if triggered by the respective data provider', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
//       await whitelist.connect(owner).addDataFeeds(dataProvider1.address, [dataFeed1, dataFeed2])

//       await whitelist.connect(dataProvider1).deactivateDataFeeds(dataProvider1.address, [0, 1])
      
//       const dataFeed1Info = await whitelist.getDataFeed(dataProvider1.address, 0)
//       // skipped other variable checks as covered in previous test
//       expect(dataFeed1Info.active).to.be.false

//       const dataFeed2Info = await whitelist.getDataFeed(dataProvider1.address, 1)
//       // skipped other variable checks as covered in previous test
//       expect(dataFeed2Info.active).to.be.false
//     })

//     it('reverts if user trying to deactivate a data feed is not owner / data provider', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
//       await whitelist.connect(owner).addDataFeeds(dataProvider1.address, [dataFeed1, dataFeed2])

//       await expect(whitelist.connect(dataProvider3).deactivateDataFeeds(dataProvider1.address, [0, 1])).to.be.revertedWith("Whitelist: only owner or data provider")
//     })

//     it('should emit a `DataFeedDeactivated` event', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
//       await whitelist.connect(owner).addDataFeeds(dataProvider1.address, [dataFeed1, dataFeed2])
//       await whitelist.connect(owner).deactivateDataFeeds(dataProvider1.address, [0])

//       const event = await dataFeedDeactivatedEvent(whitelist)
//       expect(event.providerAddress).to.eq(dataProvider1.address)
//       expect(event.index).to.eq(0)
//     })
//   })

//   describe('activateDataFeeds', () => {
//     it('should allow the contract owner to activate a previously deactivated data feed', async() => {
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
//       await whitelist.connect(owner).addDataFeeds(dataProvider1.address, [dataFeed1, dataFeed2])
//       let dataFeedInfo = await whitelist.getDataFeed(dataProvider1.address, 0)
//       expect(dataFeedInfo.active).to.be.true
//       await whitelist.connect(owner).deactivateDataFeeds(dataProvider1.address, [0])
//       dataFeedInfo = await whitelist.getDataFeed(dataProvider1.address, 0)
//       expect(dataFeedInfo.active).to.be.false

//       await whitelist.connect(owner).activateDataFeeds(dataProvider1.address, [0])
//       dataFeedInfo = await whitelist.getDataFeed(dataProvider1.address, 0)
//       expect(dataFeedInfo.active).to.be.true
//     })

//     it('should not allow a non-contract-owner (incl. the corresponding data provider) to activate a previously deactivated data feed', async() => {
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
//       await whitelist.connect(owner).addDataFeeds(dataProvider1.address, [dataFeed1, dataFeed2])
//       await whitelist.connect(owner).deactivateDataFeeds(dataProvider1.address, [0])

//       await expect(whitelist.connect(dataProvider1).activateDataFeeds(dataProvider1.address, [0])).to.be.revertedWith("Ownable: caller is not the owner")
//     })

//     it('should emit a `DataFeedActivated` event', async() => {  
//       await whitelist.connect(owner).addDataProviders([dataProvider1.address], [[nameDataProvider1, publicTrigger1]])
//       await whitelist.connect(owner).addDataFeeds(dataProvider1.address, [dataFeed1, dataFeed2])
//       await whitelist.connect(owner).deactivateDataFeeds(dataProvider1.address, [0])
//       await whitelist.connect(owner).activateDataFeeds(dataProvider1.address, [0])

//       const event = await dataFeedActivatedEvent(whitelist)
//       expect(event.providerAddress).to.eq(dataProvider1.address)
//       expect(event.index).to.eq(0)
//     })
//   })

//   describe('addCollateralTokens', () => {
//     it('should allow the contract owner to whitelist a collateral token address', async() => {  
//       expect(await whitelist.getCollateralToken(collateralToken1.address)).to.be.false
      
//       await whitelist.connect(owner).addCollateralTokens([collateralToken1.address])
      
//       expect(await whitelist.getCollateralToken(collateralToken1.address)).to.be.true
//     })

//     it('should allow the contract owner to whitelist two collateral token addresses', async() => {  
//       expect(await whitelist.getCollateralToken(collateralToken1.address)).to.be.false
//       expect(await whitelist.getCollateralToken(collateralToken2.address)).to.be.false
      
//       await whitelist.connect(owner).addCollateralTokens([collateralToken1.address, collateralToken2.address])
      
//       expect(await whitelist.getCollateralToken(collateralToken1.address)).to.be.true
//       expect(await whitelist.getCollateralToken(collateralToken2.address)).to.be.true
//     })

//     it('should not allow a non-contract-owner to whitelist a data provider', async() => {  
//       await expect(whitelist.connect(dataProvider1).addCollateralTokens([collateralToken1.address])).to.be.revertedWith("Ownable: caller is not the owner")
//     })
    
//     it('should revert if the provided address is the zero address', async() => {  
//       await expect(whitelist.connect(owner).addCollateralTokens([AddressZero])).to.be.revertedWith("Whitelist: null address")
//     })

//     it('should emit a `CollateralTokenAdded` event', async() => {  
//       await whitelist.connect(owner).addCollateralTokens([collateralToken1.address])

//       const event = await collateralTokenAddedEvent(whitelist)
//       expect(event.collateralToken).to.eq(collateralToken1.address)
//     })
//   });

//   describe('deleteCollateralTokens', () => {
//     it('should allow the contract owner to delete a collateral token address from the whitelist', async() => {  
//       await whitelist.connect(owner).addCollateralTokens([collateralToken1.address])
      
//       await whitelist.connect(owner).deleteCollateralTokens([collateralToken1.address])
      
//       expect(await whitelist.getCollateralToken(collateralToken1.address)).to.be.false
//     })

//     it('should allow the contract owner to delete two collateral token addresses from the whitelist', async() => {  
//       await whitelist.connect(owner).addCollateralTokens([collateralToken1.address])
//       await whitelist.connect(owner).addCollateralTokens([collateralToken2.address])

//       await whitelist.connect(owner).deleteCollateralTokens([collateralToken1.address])
//       await whitelist.connect(owner).deleteCollateralTokens([collateralToken2.address])
      
//       expect(await whitelist.getCollateralToken(collateralToken1.address)).to.be.false
//       expect(await whitelist.getCollateralToken(collateralToken2.address)).to.be.false
//     })

//     it('should not allow a non-contract-owner to delete a collateral token address from the whitelist', async() => {  
//       await whitelist.connect(owner).addCollateralTokens([collateralToken1.address])

//       await expect(whitelist.connect(dataProvider1).deleteCollateralTokens([collateralToken1.address])).to.be.revertedWith("Ownable: caller is not the owner")
//     })

//     it('should emit a `CollateralTokenDeleted` event', async() => {  
//       await whitelist.connect(owner).addCollateralTokens([collateralToken1.address])
//       await whitelist.connect(owner).deleteCollateralTokens([collateralToken1.address])

//       const event = await collateralTokenDeletedEvent(whitelist)
//       expect(event.collateralToken).to.eq(collateralToken1.address)
//     })
//   })
// });
