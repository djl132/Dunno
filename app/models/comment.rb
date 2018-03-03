class Comment < ApplicationRecord

  belongs_to :user
  belongs_to :answer

  acts_as_tree order: 'created_at DESC'


  def self.json_tree(comments)
    comments.map do |c|
      {:user=>c.user, :body => c.body, :id => c.id, :children => Comment.json_tree(c.children)}
    end
  end

  def destroy_children
    children.each do |c|
        c.destroy_children
        c.destroy
    end
  end

  default_scope { order('created_at ASC') }


end
