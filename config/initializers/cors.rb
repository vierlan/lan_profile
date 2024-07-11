Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    #  where your requset is coming from
    origins 'http://127.0.0.1:5173'
    origins 'http://localhost:5173'
    # origins 'https://lananh.pro'
    # what you want to allow
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['access-token', 'expiry', 'token-type', 'Authorization']
      # expose: ['Authorisation']
      #credentials: true
  end
end
