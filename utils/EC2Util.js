var AWS = require('aws-sdk');

function EC2Util(){
    let defaultRegion='us-east-1';

    return {
        getAllAvailableRegions: function getAllAvailableRegions(region=defaultRegion){
            return new Promise(resolve => {
                if(region === null || region.trim() === '') region = defaultRegion;
                const ec2 = new AWS.EC2({apiVersion: '2016-11-15',region});
                ec2.describeRegions({},(err,data) => {
                    err ? resolve(err) : resolve(data.Regions);
                });
            })
        },
        getVPCsForRegions(region=defaultRegion){
            return new Promise(resolve => {
                if(region === null || region.trim() === '') region = defaultRegion;
                const ec2 = new AWS.EC2({apiVersion: '2016-11-15',region});
                ec2.describeVpcs({},(err,data) => {
                    err ? resolve(err) : resolve(data);
                });
            })
        },
        getSubnetsForVPC(vpcIds,region=defaultRegion){
            return new Promise(resolve => {
                const ec2 = new AWS.EC2({apiVersion: '2016-11-15',region});
                const params = {
                    Filters: [
                        {
                            Name: "vpc-id",
                            Values: [
                                vpcIds
                            ]
                        }
                    ]
                };
                ec2.describeSubnets(params,(err,data) => {
                    err ? resolve(err) : resolve(data);
                });
            })
        }
    }
}

module.exports = EC2Util;