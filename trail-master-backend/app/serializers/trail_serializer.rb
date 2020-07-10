class TrailSerializer < ActiveModel::Serializer
    attributes :id, :name, :location, :difficulty, :completion_time, :elevation_gain, :image_url
    has_many :comments, serializer: CommentSerializer
end