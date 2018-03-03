class Api::V1::ConversationsController < ApiController

  before_action :authenticate_user!

# SHOW ONLY NONDELETED STUFF, BUT CAN STILL OPEN UP A CONVERSAOIN THAT
  def index
    render json: current_user.conversations
  end

  def conversations_of_current_user
    render json: current_user.conversations.includes(:messages), each_serializer: ConversationWithLastMessageSerializer
  end


  def destroy
    c = Conversation.find(params[:id])
    # binding.remote_prys
    authorize c
    # ---- user must be either sender or receiver.
    # either you send t the message to yoursleof someoen else sent it or you sent it.
    if (c.deleted_by_reciever || c.deleted_by_sender) || (c.recipient == current_user && c.sender == current_user)
    	c.destroy
    elsif c.recipient == current_user
    	c.update_attributes(deleted_by_reciever: current_user)
    elsif c.sender == current_user
    	c.update_attributes(deleted_by_sender: current_user)
    end
    # binding.remote_pry
#
    render json: 200

  end

  # Conversation shoudl be by ID


  # retrieve conversation by ID. then check if

  #

  # retrieve existing converstion for user
  # or initialize not save a conversatoin.


  #  one is wher eyou supply the id
  # both passed in the string params
  # suply the reicpient

# ADD INDEX OF UNIQUENESS FOR SENDER AND RECIEVER

# id on this is recipient_id
  def show

# IF CREATING A CONVERSATOIN, CHECK IF YOU'VE RECIEVED A CONVERSATION FROM THEM BEFORE, AND ADD MESSAGES TO THAT
    conversation = Conversation.includes(:messages,:sender, :recipient).find_or_initialize_by(recipient: current_user, sender: User.find(params[:recipient_id]))
    # check if user sent message to persno
    # if not either, initialize conversation, that will provide FE information about
    #  new conversation, but do not save until a message has been sent.
    if !conversation.id?
      conversation = Conversation.includes(:messages,:sender, :recipient).find_or_initialize_by(sender: current_user, recipient: User.find(params[:recipient_id]))
      # prepartions for INDEX VIEW - SO YOU CAN SEE THE DELETED CONVERSATION YOU STARTED
       if conversation.deleted_by_sender == current_user
         conversation.update_attributes(deleted_by_sender: nil)
       end
    end

    authorize conversation

    conversation.update_attributes(deleted_by_reciever: nil)

    pp conversation

    # check if the user has deleted it.

    # binding.pry_remote

    render json: conversation, serializer: ConversationSerializer
  end


#   def show
#
# # IF CREATING A CONVERSATOIN, CHECK IF YOU'VE RECIEVED A CONVERSATION FROM THEM BEFORE, AND ADD MESSAGES TO THAT
#     conversation = Conversation.find_or_initialize_by(recipient: current_user, sender: User.find(params[:recipient_id]))
#     # check if user sent message to persno
#     # if not either, initialize conversation, that will provide FE information about
#     #  new conversation, but do not save until a message has been sent.
#     if !conversation.id?
#       conversation = Conversation.find_or_initialize_by(sender: current_user, recipient: User.find(params[:recipient_id]))
#       # prepartions for INDEX VIEW - SO YOU CAN SEE THE DELETED CONVERSATION YOU STARTED
#        if conversation.deleted_by_sender == current_user
#          conversation.update_attributes(deleted_by_sender: nil)
#        end
#     end
#
#     authorize conversation
#
#     conversation.update_attributes(deleted_by_reciever: nil)
#
#     pp conversation
#
#     # check if the user has deleted it.
#
#     messages = conversation.messages.paginate(page: params[:page], per_page: 30)
#     binding.pry_remote
#
#     render json: messages, each_serializer: MessageSerializer, meta: {isLastPage: isLastPage(messages)}
#   end

private

# if not deleted currently, and recieved, or sent, SHOW.
  def is_accessible(convo)
    if convo.sender == current_user
      return convo.deleted_by_sender != current_user
      #  IN CASE MESSAGE IS SOLILOQUY
    elsif convo.recipient == current_user
      return convo.deleted_by_reciever != current_user
      # YOU AREN'T INVOLVED IN THE CONVERSATION.
    else
      false
    end
  end

end
