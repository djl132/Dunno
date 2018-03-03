class BanPolicy < ApplicationPolicy
  attr_reader :user, :ban

  def initialize(user, ban)
    @user = user
    @ban = ban
  end

  def create?
    !ban.banned_group.admins.include?(ban.banned_user) && (ban.banned_group.admins.include?(user) || user.admin?) && (user != ban.banned_user)
  end

  def destroy?
    ban.banned_group.admins.include?(user) || user.admin?
  end

end
