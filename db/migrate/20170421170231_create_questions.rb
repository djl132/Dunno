class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.text :title
      t.json 'body'

      t.timestamps
    end
  end
end
