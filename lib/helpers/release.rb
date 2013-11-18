require 'open-uri'
require 'rubygems'
require 'json'
require 'date'

module ReleaseHelper
  def releases()
    file = open('https://api.github.com/repos/usergrid/usergrid/releases')
    return JSON.parse(file.read)
    # if type != 'timestamp'
    #   parsed['response']['docs'][0][type]
    # else
    #   DateTime.strptime(parsed['response']['docs'][0][type].to_s[0,10],'%s')
    # end
  end
end