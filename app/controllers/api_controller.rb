class ApiController < ApplicationController
  respond_to :json
  layout false
  serialization_scope :view_context


private
  def isLastPage(resource)
    resource.current_page == resource.total_pages
  end

end
