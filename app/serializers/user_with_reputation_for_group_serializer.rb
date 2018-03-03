class UserWithReputationForGroupSerializer < ApplicationSerializer
  attributes :id, :username, :reputation_for_topics

  # def reputation_for_topic
    #   object.reputation_for_topics(serialization_options[:group_name])
    #3ne

end
