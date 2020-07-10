class TrailSerializer < ActiveModel::Serializer
    attributes :id, :name, :start_location, :end_location, :distance, :difficulty, :completion_time, :elevation_gain, :image_url, :completed
    has_many :comments, serializer: CommentSerializer
end