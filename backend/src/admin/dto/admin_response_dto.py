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

from pydantic import BaseModel


class AdminOverviewStats(BaseModel):
    total_users: int
    total_workspaces: int
    images_generated: int
    videos_generated: int
    audios_generated: int
    total_media: int


class AdminMediaOverTime(BaseModel):
    date: str
    total_generated: int
    images: int
    videos: int
    audios: int


class AdminWorkspaceStats(BaseModel):
    workspace_id: int
    workspace_name: str | None = None
    total_media: int
    images: int
    videos: int
    audios: int


class AdminActiveRole(BaseModel):
    role: str
    count: int


class AdminGenerationHealth(BaseModel):
    status: str
    count: int


class AdminMonthlyActiveUsers(BaseModel):
    month: str
    count: int

