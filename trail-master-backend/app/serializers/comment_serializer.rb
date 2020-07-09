class CommentSerializer < ActiveModel::Serializer
    attributes :id, :name, :content, :trail_id, :created_at
    belongs_to :trail, serializer: TrailSerializer
end