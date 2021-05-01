var express = require('express');
var router = express.Router();
var ec2Util = require('../utils/EC2Util')();

router.get('/',(req,res,next) => {
    res.send('index page for aws path');
})

router.get('/regionsList', async (req,res , next) => {
    res.send(await ec2Util.getAllAvailableRegions());
})

router.get('/vpcForRegion', async (req,res , next) => {
    let region = req.query.region ? req.query.region: null;
    res.send(await ec2Util.getVPCsForRegions(region));
})

router.get('/subnetsForVPC', async (req,res , next) => {
    let vpcIds = req.query.vpcIds ? req.query.vpcIds : null;
    res.send(await ec2Util.getSubnetsForVPC(vpcIds));
})

module.exports = router;