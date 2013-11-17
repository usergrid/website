require 'open-uri'
require 'rubygems'
require 'json'
require 'date'

module ReleaseHelper
  def releases()
    file = open('http://search.maven.org/solrsearch/select?q=g:%22org.usergrid%22+AND+a:%22usergrid-core%22&rows=20&core=gav')
    return JSON.parse(file.read)
    # if type != 'timestamp'
    #   parsed['response']['docs'][0][type]
    # else
    #   DateTime.strptime(parsed['response']['docs'][0][type].to_s[0,10],'%s')
    # end
  end
end