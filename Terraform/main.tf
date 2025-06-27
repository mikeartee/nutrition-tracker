Running Ruby on Rails on an AWS three-tier architecture:
- Create the web application in a VPC so that it supports public/private subnets in multiple availability zones.
- Create a public subnet with a public-facing load balancer that can communicate from your private web application to the internet.
- Create private subnets for the multi-az database and the Autoscaler.
- Create a security group for each subnet to lock down to only the required ports.
- Bonus – Include Cloudtrail/Cloudwatch for any additional logging/metrics, and AWS WAF (Web Application Firewall) for enhanced security.
