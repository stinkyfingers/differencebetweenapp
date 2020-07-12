# s3
resource "aws_s3_bucket" "db" {
  bucket = "differencebetween.john-shenk.com"
  acl = "private"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "Cloudfront Read",
          "Effect": "Allow",
          "Principal": {
              "AWS": "${aws_cloudfront_origin_access_identity.db.iam_arn}"
          },
          "Action": "s3:GetObject",
          "Resource": [
            "arn:aws:s3:::differencebetween.john-shenk.com/*",
            "arn:aws:s3:::differencebetween.john-shenk.com"
          ]
      }
  ]
}
EOF
}

resource "aws_s3_bucket_public_access_block" "db" {
  bucket = aws_s3_bucket.db.id
  block_public_acls   = true
  block_public_policy = true
}

resource "aws_cloudfront_origin_access_identity" "db" {
  comment = "differencebetween.john-shenk.com identity"
}

locals {
  s3_origin_id = "differencebetween-origin"
}

resource "aws_cloudfront_distribution" "db" {
  origin {
    domain_name = aws_s3_bucket.db.bucket_domain_name
    origin_id   = local.s3_origin_id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.db.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = ["differencebetween.john-shenk.com"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id
    trusted_signers = []

    forwarded_values {
      query_string = false
      query_string_cache_keys = []
      headers = []

      cookies {
        forward = "none"
        whitelisted_names = []
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 31536000
  }

  custom_error_response {
    error_code = 403
    response_code = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
        locations        = []
        restriction_type = "none"
    }
}

  viewer_certificate {
      acm_certificate_arn            = "arn:aws:acm:us-east-1:671958020402:certificate/fc7ab094-b641-4898-8aca-24739e555f73"
      cloudfront_default_certificate = false
      minimum_protocol_version       = "TLSv1.1_2016"
      ssl_support_method             = "sni-only"
  }
}

resource "aws_route53_record" "db" {
  zone_id = "Z3P68RXJ4VECYX"
  name    = "differencebetween.john-shenk.com"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.db.domain_name
    zone_id                = "Z2FDTNDATAQYW2"
    evaluate_target_health = false
  }
}
