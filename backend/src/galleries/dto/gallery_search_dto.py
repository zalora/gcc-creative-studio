# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import datetime
from typing import Optional, Union

from pydantic import Field

from src.common.base_dto import GenerationModelEnum, MimeTypeEnum, WildcardMimeTypeEnum
from src.common.dto.base_search_dto import BaseSearchDto
from src.common.schema.media_item_model import JobStatusEnum
from src.galleries.dto.gallery_response_dto import MediaItemResponse


class GallerySearchDto(BaseSearchDto):
    user_email: Optional[str] = None
    mime_type: Optional[Union[MimeTypeEnum, WildcardMimeTypeEnum]] = None
    model: Optional[GenerationModelEnum] = None
    status: Optional[JobStatusEnum] = None
    workspace_id: Optional[int] = Field(
        None, ge=1, description="The ID of the workspace to search within."
    )
    include_deleted: bool = False
    start_date: Optional[datetime.datetime] = None
    end_date: Optional[datetime.datetime] = None
    item_type: Optional[str] = None # 'media_item' or 'source_asset'
