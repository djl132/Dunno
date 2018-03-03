class Api::V1::MessagesController < ApiController

  before_action  :authenticate_user!

  def create

# STARTING CONVERSATION/CONTINUING CONVERSATION
# FIND THE CONVERSTATION BETWWEEN TCURRENT USER AND OTHER USER. COULD BE A CONVERSATOIN THAT HE SENT, OR DID NOT SEND.



# REPLYING TO A CONVERSATION THAT YOU RECIEVED.
    c = Conversation.find_by(recipient: current_user, sender: User.find(params[:recipient_id]))

    if c.nil?
# start or create convo.
      c = Conversation.find_or_create_by(sender: current_user, recipient: User.find(params[:recipient_id]))
      m = c.messages.build(body: params[:body], user: current_user)
      # authorize sent_convo
      # TO DO:::: CREATE CONVERSATION ONLY WITH YOURSELF, IF SENDER == RECIPINET, ERR.
      if m.valid?
        m.save
        c.update_attributes(deleted_by_reciever: nil);
        render json: m, include: [conversation: [messages: :user]]
      else
        render json: 500
      end
    else
# reply to convo.
      m = c.messages.build(body: params[:body], user: current_user)
      if m.valid?
        m.save
        render json: m, include: [conversation: [messages: :user]]
        c.update_attributes(deleted_by_sender: nil);
      else
        render json: 500
      end
    end

    # binding.remote_pry
    # c.update_attributes(updated_at: Time.now)


    # thsi makse srue that the sender that deleted it, can see the conversation agaon.

  end

end
