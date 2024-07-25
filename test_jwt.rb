require 'jwt'

# Your secret key
hmac_secret = 'your_secret_key'

# Decode the token
begin
  decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
  # Output the decoded token for inspection
  puts decoded_token
rescue JWT::ExpiredSignature
  puts "The token has expired."
rescue JWT::DecodeError
  puts "There was an error decoding the token."
end
